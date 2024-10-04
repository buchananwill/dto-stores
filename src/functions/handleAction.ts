type PreparePayload<T> = () => T | undefined;
type Action<T, U> = (payload: T) => Promise<U>;
type OnSuccess<T> = (result: T) => void;
type OnError = (error: Error) => void;

export function handleAction<Payload, Response>(
  preparePayload: PreparePayload<Payload>, // Function to prepare the payload for the action
  action: Action<Payload, Response>, // The action function that takes the payload and returns a promise
  onSuccess: OnSuccess<Response>, // Callback on successful resolution of the action
  onError?: OnError, // Optional error handler if the action fails
) {
  const payload = preparePayload(); // Prepare the payload

  if (payload === undefined) {
    console.error("Payload preparation failed or was empty");
    return;
  }

  action(payload)
    .then((response) => onSuccess(response)) // Handle success case
    .catch((error: Error) => {
      if (onError) {
        onError(error); // Use provided error handler
      } else {
        console.error("Error during action:", error); // Default error logging
      }
    });
}
