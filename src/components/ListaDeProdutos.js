import React, { useState, useEffect } from 'react';
import "./ListaDeProdutos.css";

import firebase from './firebaseConfig';
import Navbar from './Navbar';

import ProductAPI from './daoProduct';

function ListaDeProdutos() {
    const [userId, setUserId] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState('');
    const [novaQuantidade, setNovaQuantidade] = useState(0);
    const [novoValorUnitario, setNovoValorUnitario] = useState(0);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                window.location.href = "/cadastro";
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (userId) {
                try {
                    const productsFromAPI = await ProductAPI.readProducts(userId);
                    setProdutos(productsFromAPI);
                } catch (error) {
                    console.error('Erro ao buscar produtos:', error);
                }
            }
        };

        fetchProducts();
    }, [userId]);

    const adicionarProduto = async () => {
        const produtoData = {
            descricao: novoProduto,
            quantidade: novaQuantidade,
            valorUnitario: novoValorUnitario
        };

        try {
            const newProductId = await ProductAPI.createProduct(produtoData, userId);
            // Atualize a lista de produtos após a adição
            const updatedProducts = [...produtos, { id: newProductId, ...produtoData, valorTotal: novaQuantidade * novoValorUnitario }];
            setProdutos(updatedProducts);
            setNovoProduto('');
            setNovaQuantidade(0);
            setNovoValorUnitario(0);
            setMostrarFormulario(false);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const removerProduto = async (productId) => {
        try {
            await ProductAPI.deleteProduct(productId, userId);
            // Atualize a lista de produtos após a remoção
            const updatedProducts = produtos.filter(product => product.id !== productId);
            setProdutos(updatedProducts);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    const editarProduto = async (produtoEditado) => {
        try {
            await ProductAPI.updateProduct(produtoEditado, userId);
            // Atualize a lista de produtos após a edição
            const updatedProducts = produtos.map(product => {
                if (product.id === produtoEditado.id) {
                    return { ...product, ...produtoEditado };
                }
                return product;
            });
            setProdutos(updatedProducts);
            setProdutoEditando(null);
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    return (
        <div className="lista-de-produtos">
            <h1>Produtos</h1>
            <Navbar />
            {mostrarFormulario && (
                <div className="adicionar-produto">
                    <label>
                        Nome do Produto:
                        <input
                            type="text"
                            value={novoProduto}
                            onChange={(e) => setNovoProduto(e.target.value)}
                            placeholder="Digite um novo produto"
                        />
                    </label>
                    <label>
                        Quantidade:
                        <input
                            type="number"
                            value={novaQuantidade}
                            onChange={(e) => setNovaQuantidade(Number(e.target.value))}
                            placeholder="Quantidade"
                        />
                    </label>
                    <label>
                        Valor Unitário (R$):
                        <input
                            type="number"
                            value={novoValorUnitario}
                            onChange={(e) => setNovoValorUnitario(Number(e.target.value))}
                            placeholder="Valor Unitário"
                        />
                    </label>
                    <button onClick={adicionarProduto}>Adicionar</button>
                </div>
            )}
            {!mostrarFormulario && (
                <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
            )}
            <ul>
                {produtos.map(product => (
                    <li key={product.id} className="produto">
                    {produtoEditando && produtoEditando.id === product.id ? (
    <div className="editar-produto">
        <input
            type="text"
            value={produtoEditando.descricao}
            onChange={(e) => setProdutoEditando({...produtoEditando, descricao: e.target.value})}
        />
        <input
            type="number"
            value={produtoEditando.quantidade}
            onChange={(e) => setProdutoEditando({...produtoEditando, quantidade: Number(e.target.value)})}
        />
        <input
            type="number"
            value={produtoEditando.valorUnitario}
            onChange={(e) => setProdutoEditando({...produtoEditando, valorUnitario: Number(e.target.value)})}
        />
        <button className="editar-botao" onClick={() => editarProduto(produtoEditando)}>Salvar</button>
    </div>
) : (
    <div>
        <div>{product.descricao}</div>
        <div>Quantidade: {product.quantidade}</div>
        <div>Valor Unitário: R$ {product.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div>Valor Total: R$ {(product.quantidade * product.valorUnitario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div className="acoes-produto">
            <div className="editar-produto" onClick={() => setProdutoEditando({...product})}>Editar</div>
            <div className="remover-produto" onClick={() => removerProduto(product.id)}>Excluir</div>
        </div>
    </div>
)}

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaDeProdutos;
