export class PermissionRequest {
    id: string;
    requesterAddress: string;
    patientAddress: string;
    patientName: string;
    permissionLevel: number;
    status: number;

    constructor(request) {
        this.id = request.id || null;
        this.requesterAddress = request.requesterAddress || '';
        this.patientAddress = request.patientAddress || '';
        this.patientName = request.patientName || '';
        this.permissionLevel = request.permissionLevel || '';
        this.status = request.status || 0;
    }
}