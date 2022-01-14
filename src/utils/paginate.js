import _ from "lodash"

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize
  // _.slice(items, startIndex)
  // _.take(_.slice(items, startIndex), pageSize)
  return _(items).slice(startIndex).take(pageSize).value()
}
