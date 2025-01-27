import Api from '~/shared/Api';

export default class extends Api {
  constructor() {
    super('/api/profile');
  }

  async updateProfile(formData) {
    return this.client.put('/', formData);
  }
}