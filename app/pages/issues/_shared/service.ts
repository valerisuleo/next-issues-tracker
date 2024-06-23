import { HttpService } from '../../../common/services/http-service/http-service';

class IssuesService extends HttpService {
    constructor() {
        super('/api/issues');
    }
}

export const issuesService = new IssuesService();
