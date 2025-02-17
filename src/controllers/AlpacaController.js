// controllers/AlpacaController.js
import AlpacaModel from '../models/AlpacaModel';

class AlpacaController {
  // Method to retrieve account data and handle any errors
  static async fetchAccountData() {
    try {
      const accountData = await AlpacaModel.getAccountData();
      return { success: true, data: accountData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default AlpacaController;
