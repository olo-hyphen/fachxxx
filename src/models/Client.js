/**
 * @typedef {object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} [phone]
 * @property {string} [email]
 * @property {string} [address]
 * @property {string} [nip]
 */

/**
 * Creates a new Client object.
 * @param {object} data
 * @param {string} data.name
 * @param {string} [data.phone]
 * @param {string} [data.email]
 * @param {string} [data.address]
 * @param {string} [data.nip]
 * @returns {Client}
 */
export function createClient({ name, phone, email, address, nip }) {
  return {
    id: crypto.randomUUID(),
    name,
    phone,
    email,
    address,
    nip,
  };
}
