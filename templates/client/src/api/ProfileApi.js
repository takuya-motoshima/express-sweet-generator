import Api from '~/shared/Api';

/**
 * API client for user profile operations.
 */
export default class extends Api {
  /**
   * Creates a new instance of this API client. 
   */
  constructor() {
    super('/api/profile');
  }

  /**
   * Updates the user's profile.
   * @param {FormData} formData The form data containing the updated profile information.
   * @returns {Promise<object>} The API response.
   */
  async updateProfile(formData) {
    return this.client.put('/', formData);
  }
}