import * as jwt from 'jsonwebtoken'

export default (request: any, response: any, next: any) => {
    const key = request.get('Authorization');
    if (!key) {
        response.status(400).json({ message: 'No Authentication Provided' })
    } else {
        verifyJWT(key)
    }
    next()
}

const verifyJWT = (key: string) => {
    try {
        const keypair = key.split(' ')
        return jwt.verify(keypair[1], 'D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeS')
    } catch (error) {
        throw new Error('Invalid Signature')
    }
}