const UTM_STORAGE_KEY = 'newhaus_utm_params';
const UTM_SESSION_KEY = 'newhaus_utm_session';

/**
 * Extract UTM parameters from URL
 */
export const getUTMParamsFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_content: params.get('utm_content') || null,
    utm_campaign: params.get('utm_campaign') || null,
    utm_term: params.get('utm_term') || null,
  };
};

/**
 * Check if URL has UTM parameters
 */
export const hasUTMParams = () => {
  const params = getUTMParamsFromURL();
  return Object.values(params).some(value => value !== null);
};

/**
 * Store UTM parameters in localStorage (persistent)
 * Only stores if there are actual UTM parameters in the URL
 */
export const storeUTMParams = () => {
  const utmParams = getUTMParamsFromURL();
  
  // Only store if there are actual UTM parameters
  if (hasUTMParams()) {
    try {
      // Store in localStorage for persistence across sessions
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({
        ...utmParams,
        first_seen: new Date().toISOString(),
      }));
      
      // Also store in sessionStorage for current session
      sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify({
        ...utmParams,
        session_start: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to store UTM parameters:', error);
    }
  }
};

/**
 * Get stored UTM parameters
 * Priority: Current URL > Session Storage > Local Storage
 */
export const getStoredUTMParams = () => {
  // First, check if current URL has UTM parameters
  const currentUTM = getUTMParamsFromURL();
  if (hasUTMParams()) {
    // If current URL has UTM params, update storage and return them
    storeUTMParams();
    return currentUTM;
  }
  
  // Otherwise, try to get from sessionStorage first (more recent)
  try {
    const sessionUTM = sessionStorage.getItem(UTM_SESSION_KEY);
    if (sessionUTM) {
      const parsed = JSON.parse(sessionUTM);
      // Return only the UTM values, not metadata
      return {
        utm_source: parsed.utm_source || null,
        utm_medium: parsed.utm_medium || null,
        utm_content: parsed.utm_content || null,
        utm_campaign: parsed.utm_campaign || null,
        utm_term: parsed.utm_term || null,
      };
    }
  } catch (error) {
    console.error('Failed to read session UTM parameters:', error);
  }
  
  // Fallback to localStorage
  try {
    const storedUTM = localStorage.getItem(UTM_STORAGE_KEY);
    if (storedUTM) {
      const parsed = JSON.parse(storedUTM);
      return {
        utm_source: parsed.utm_source || null,
        utm_medium: parsed.utm_medium || null,
        utm_content: parsed.utm_content || null,
        utm_campaign: parsed.utm_campaign || null,
        utm_term: parsed.utm_term || null,
      };
    }
  } catch (error) {
    console.error('Failed to read stored UTM parameters:', error);
  }
  
  // Return null values if nothing found
  return {
    utm_source: null,
    utm_medium: null,
    utm_content: null,
    utm_campaign: null,
    utm_term: null,
  };
};

/**
 * Initialize UTM tracking - should be called on app load
 */
export const initUTMTracking = () => {
  // Store UTM parameters if they exist in the URL
  storeUTMParams();
};

