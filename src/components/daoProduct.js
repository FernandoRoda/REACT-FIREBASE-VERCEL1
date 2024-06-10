import firebase from './firebaseConfig';

const ProductAPI = {
  // Criar um novo produto
  createProduct: async (productData, userId) => {
    try {
      const newProductRef = firebase.database().ref(`products/${userId}`).push();
      await newProductRef.set(productData);
      return newProductRef.key; // Retorna o ID do novo produto
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // Ler todos os produtos
  readProducts: async (userId) => {
    try {
      const snapshot = await firebase.database().ref(`products/${userId}`).once('value');
      const products = [];
      snapshot.forEach((childSnapshot) => {
        const productData = childSnapshot.val();
        const product = {
          id: childSnapshot.key,
          ...productData,
          valorTotal: productData.quantidade * productData.valorUnitario // Calcula o valor total
        };
        products.push(product);
      });
      return products;
    } catch (error) {
      console.error('Erro ao ler produtos:', error);
      throw error;
    }
  },

  // Atualizar um produto existente
  updateProduct: async (produtoEditado, userId) => {
    try {
        const productRef = firebase.firestore().collection('users').doc(userId).collection('products').doc(produtoEditado.id);
        await productRef.update({
            descricao: produtoEditado.descricao,
            quantidade: produtoEditado.quantidade,
            valorUnitario: produtoEditado.valorUnitario
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
    }
},

  // Excluir um produto
  deleteProduct: async (productId, userId) => {
    try {
      await firebase.database().ref(`products/${userId}/${productId}`).remove();
      console.log('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    }
  }
};

export default ProductAPI;
