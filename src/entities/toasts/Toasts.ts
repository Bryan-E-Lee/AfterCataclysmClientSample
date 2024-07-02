import { getUniqueIdentifier } from "../../utils/GUID";

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export abstract class Toast {
    public constructor(
        public readonly message: React.ReactNode,
        public readonly toastType: ToastType
    ) {
        this.id = getUniqueIdentifier();
    }

    public readonly id: string;
    public timeout: NodeJS.Timeout | number | null = null;
}

export class SuccessToast extends Toast {
    public constructor(public readonly message: React.ReactNode) {
        super(message, 'success');
    }
}

export class InfoToast extends Toast {
    public constructor(public readonly message: React.ReactNode) {
        super(message, 'info');
    }
}

export class WarningToast extends Toast {
    public constructor(public readonly message: React.ReactNode) {
        super(message, 'warning');
    }
}

export class ErrorToast extends Toast {
    public constructor(public readonly message: React.ReactNode) {
        super(message, 'error');
    }
}