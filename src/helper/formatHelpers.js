export const formatAddress = address => {
  if (!address) return ''
  const start = address.slice(0, 6)
  const end = address.slice(-4)
  return `${start}...${end}`
}

export const formatTimestamp = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000) // Convert to milliseconds
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
}
