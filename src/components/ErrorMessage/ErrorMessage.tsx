import React from "react";

interface ErrorMessageProps {
  message?: string   // Main error text to display
  code?: number      // HTTP status code
  details?: string   // Additional error information
}

/**
 * Displays error messages with optional HTTP status code and details.
 * Automatically extracts status code from message text if not explicitly provided.
 * Shows predefined error descriptions for common HTTP status codes.
 * 
 * @component
 * @example
 * //Basic usage with explicit code
 * <ErrorMessage message='Not Found' code={404}/>
 * 
 * @example
 * //With additional details
 * <ErrorMessage message='Bad Gateway' code={502} details='Server connection issues.'/>
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({message, code, details}) => {
    if(!message) return null; 
    //We retrieve the error code from the message
    const codeMatch = message.match(/\d+/) 
    const extractedCode = codeMatch ? Number(codeMatch[0]) : null
    const finalCode = code || extractedCode || 0

    let localMessage = message
    let localDetails = details || ''


    // Mapping codes to standard messages
    const errorMessages: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        429: 'Too Many Requests',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
    }

    // Mapping codes to local messages
    const defaultMessages: Record<number, string> = {
        429: 'Too many requests. Try again later.',
        500: 'Server error. Try again later.',
        502: 'Server connection issues.',
        503: 'Server temporarily unavailable.',
    }

        
    if (finalCode > 0 && errorMessages[finalCode]) {
        localMessage = errorMessages[finalCode]
        if (defaultMessages[finalCode]) {
        localDetails = defaultMessages[finalCode]
        }
    }

    if (finalCode === 0) {
        localMessage = message
        localDetails = details || 'Try again later'
    }

    return(
        <div className="bg-red-300 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {finalCode > 0 && <h1 className="font-bold">Ошибка {finalCode}</h1>}
            <p>{localMessage}</p>
            {localDetails && <p className="text-sm">{localDetails}</p>}
        </div>
    )
}

export default ErrorMessage;