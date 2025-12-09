import axios from 'axios';


const CMS_BASE_URL = import.meta.env.VITE_CMS_URL;


class NoticeService {
    static instance;
    api;

    constructor() {
        this.api = axios.create({
            baseURL: CMS_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    static getInstance() {
        if (!NoticeService.instance) {
            NoticeService.instance = new NoticeService();
        }
        return NoticeService.instance;
    }
    async getNotices(params = {}) {
        const response = await this.api.get("/notice/all", { params });
        return response.data.data;
    }
}

export const noticeService = NoticeService.getInstance();
