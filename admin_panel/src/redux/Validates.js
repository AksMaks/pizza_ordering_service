//Валидация
export const required = value => (value || typeof value === 'number' ? undefined : 'Обязательный')
export const min5 = value => (value.length < 5 ? undefined : 'Надо меньше 5')
export const phone = value => value.slice(3).replace(/[^\d]/g, '').length < 10?  "Номер введен не полностью": undefined
