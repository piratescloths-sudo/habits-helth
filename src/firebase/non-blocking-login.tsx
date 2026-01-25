'use client';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';

/**
 * Initiates email/password sign-up.
 * Returns a promise that resolves on success or rejects on error.
 */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiates email/password sign-in.
 * Returns a promise that resolves on success or rejects on error.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiates Google sign-in using a popup.
 * Returns a promise that resolves on success or rejects on error.
 */
export function initiateGoogleSignIn(authInstance: Auth): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(authInstance, provider);
}
