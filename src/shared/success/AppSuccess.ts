class AppSuccess {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly status: string;

    constructor(message: string, statusCode = 200) {
        this.statusCode = statusCode;
        this.status = 'success';
        this.message = message;
    }
}

export default AppSuccess;