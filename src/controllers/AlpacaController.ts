// controllers/AlpacaController.ts
import AlpacaModel from '../models/AlpacaModel';

interface AccountData {
  id: string;
  status: string;
  currency: string;
  cash: string;
}

interface AccountDataResponse {
  success: boolean;
  data?: AccountData;
  error?: string;
}

class AlpacaController {
  // Method to retrieve account data and handle any errors
  static async fetchAccountData(): Promise<AccountDataResponse> {
    try {
      const accountData = await AlpacaModel.getAccountData();
      return { success: true, data: accountData };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: 'An unknown error occurred' };
      }
    }
  }
}

export default AlpacaController;
