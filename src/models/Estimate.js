/**
 * @typedef {object} EstimateItem
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} total
 */

/**
 * @typedef {object} Estimate
 * @property {string} id
 * @property {string} estimateNumber
 * @property {string} clientId
 * @property {string} clientName
 * @property {EstimateItem[]} items
 * @property {number} total
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * Creates a new Estimate object.
 * @param {object} data
 * @param {string} data.clientId
 * @param {string} data.clientName
 * @param {EstimateItem[]} data.items
 * @returns {Estimate}
 */
export function createEstimate({ clientId, clientName, items }) {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  return {
    id: crypto.randomUUID(),
    estimateNumber: `K/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${Math.floor(Math.random() * 1000)}`,
    clientId,
    clientName,
    items,
    total,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
