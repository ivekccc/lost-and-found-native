import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { MessageModal, MessageModalConfig } from "../components/modal/MessageModal";

interface MessageContextType {
  confirm: (config: MessageModalConfig) => Promise<boolean>;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function useMessage(): MessageContextType {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return context;
}

interface MessageProviderProps {
  children: ReactNode;
}

export function MessageProvider({ children }: MessageProviderProps) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<MessageModalConfig | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((modalConfig: MessageModalConfig): Promise<boolean> => {
    setConfig(modalConfig);
    setVisible(true);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setVisible(false);
    resolveRef.current?.(true);
    resolveRef.current = null;
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
    resolveRef.current?.(false);
    resolveRef.current = null;
  }, []);

  return (
    <MessageContext.Provider value={{ confirm }}>
      {children}
      <MessageModal
        visible={visible}
        config={config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </MessageContext.Provider>
  );
}
