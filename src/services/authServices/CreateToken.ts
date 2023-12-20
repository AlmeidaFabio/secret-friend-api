import { getToday } from "../../utils/getToday";

export const createToken = () => {
    const currentPassword = getToday().split('/').join('')

    return `${process.env.DEFAULT_TOKEN}${currentPassword}`
}
