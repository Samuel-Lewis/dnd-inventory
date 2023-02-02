import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

import { firebase } from "~/api/firebase";
import { userConnection } from "~/api/firebase/firestore/user";

export const useLocalUser = () => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth);
  const localUserRef = userConnection.getDoc(authUser?.uid);
  const [localUser, userLoading, userError] = useDocument(localUserRef);

  return {
    authUser,
    authLoading,
    authError,
    localUser,
    userLoading,
    userError,
    isLoading: authLoading || userLoading,
    isError: !!authError || !!userError,
  };
};
