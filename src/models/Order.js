/**
 * @typedef {object} Order
 * @property {string} id
 * @property {string} orderNumber
 * @property {string} clientId
 * @property {string} clientName
 * @property {string} description
 * @property {'nowe' | 'w toku' | 'zakończone' | 'anulowane'} status
 * @property {string[]} [photos]
 * @property {string} [location]
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * Creates a new Order object.
 * @param {object} data
 * @param {string} data.clientId
 * @param {string} data.clientName
 * @param {string} data.description
 * @returns {Order}
 */
export function createOrder({ clientId, clientName, description }) {
  return {
    id: crypto.randomUUID(),
    orderNumber: `Z/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${Math.floor(Math.random() * 1000)}`,
    clientId,
    clientName,
    description,
    status: 'nowe',
    photos: [],
    location: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
