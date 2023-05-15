import React, {
  ReactNode,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from "react";
import { View, Modal } from "react-native";

import styles from "./styles";

interface ModalContextProps {
  show: (content: ReactNode) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export default function ModalProvider({ children }: PropsWithChildren) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const contextValue = {
    show: (content: ReactNode) => {
      setModalContent(content);
      setModalVisible(true);
    },
    hide: () => setModalVisible(false),
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>{modalContent}</View>
        </View>
      </Modal>

      {/* */}
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("useModal must be called inside ModalProvider!");

  return context;
}
