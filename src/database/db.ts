import { connect } from 'mongoose'
import { MONGODB_URI } from '../configuration';

export default async () => {
    try {
        await connect(MONGODB_URI);
    } catch (err: unknown) {
        const message = (err as Error).message;
        console.error(message);
        process.exit(1);
    }
};
