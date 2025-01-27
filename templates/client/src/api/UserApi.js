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
   * @return {Promise<object>} The API response.
   */
  async login(formData) {
    return this.client.post('login', formData);
  }

  /**
   * Logs out the current user.
   * @return {void} 
   */
  async logout() {
    location.assign('/api/users/logout');
  }

  /**
   * Creates a new user.
   * @param {FormData} formData The form data containing the new user's information.
   * @return {Promise<object>} The API response.
   */
  async createUser(formData) {
    return this.client.post('/', formData);
  }

  /**
   * Retrieves a user by ID.
   * @param {number} userId The ID of the user to retrieve.
   * @return {Promise<object>} The API response.
   */
  async getUser(userId) {
    return this.client.get(`/${userId}`);
  }

  /**
   * Updates a user by ID.
   * @param {number} userId The ID of the user to update.
   * @param {FormData} formData - The form data containing the updated user information.
   * @return {Promise<object>} The API response.
   */
  async updateUser(userId, formData) {
    return this.client.put(`/${userId}`, formData);
  }

  /**
   * Deletes a user by ID.
   * @param {number} userId The ID of the user to delete.
   * @return {Promise<object>} The API response.
   */
  async deleteUser(userId) {
    return this.client.delete(`/${userId}`);
  }
}