import Api from '~/shared/Api';

/**
 * API client for user management operations.
 */
export default class extends Api {
  /**
   * Creates a new instance of this API client. 
   */
  constructor() {
    super('/api/users');
  }

  /**
   * Logs in a user.
   * @param {FormData} formData The form data containing the user's login credentials.
   * @returns {Promise<object>} The API response.
   */
  async login(formData) {
    return this.client.post('login', formData);
  }

  /**
   * Logs out the current user.
   * @returns {void} 
   */
  async logout() {
    location.assign('/api/users/logout');
  }

  /**
   * Creates a new user.
   * @param {FormData} formData The form data containing the new user's information.
   * @returns {Promise<object>} The API response.
   */
  async createUser(formData) {
    return this.client.post('/', formData);
  }

  /**
   * Retrieves a user by ID.
   * @param {number} userId The ID of the user to retrieve.
   * @returns {Promise<object>} The API response.
   */
  async getUser(userId) {
    return this.client.get(`/${userId}`);
  }

  /**
   * Updates a user by ID.
   * @param {number} userId The ID of the user to update.
   * @param {FormData} formData - The form data containing the updated user information.
   * @returns {Promise<object>} The API response.
   */
  async updateUser(userId, formData) {
    return this.client.put(`/${userId}`, formData);
  }

  /**
   * Deletes a user by ID.
   * @param {number} userId The ID of the user to delete.
   * @returns {Promise<object>} The API response.
   */
  async deleteUser(userId) {
    return this.client.delete(`/${userId}`);
  }
}