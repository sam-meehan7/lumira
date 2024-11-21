interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: CredentialResponse) => void;
        }) => void;
        renderButton: (element: HTMLElement, options: any) => void;
      };
    };
  };
  handleCredentialResponse?: (response: CredentialResponse) => void;
}
