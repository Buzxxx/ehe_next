import * as React from "react";
import { SCREEN_SIZES } from "@settings/settings";

// Helper to create hooks for specific breakpoints
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const updateMatches = () => setMatches(mql.matches);

    updateMatches();
    mql.addEventListener("change", updateMatches);

    return () => mql.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

// Hook for custom breakpoints
export function useBreakpoint(maxWidth: number): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px)`);
}

// Predefined hooks for common screen sizes
export function useIsMobile(): boolean {
  return useBreakpoint(SCREEN_SIZES.mobile - 1);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${SCREEN_SIZES.mobile}px) and (max-width: ${
      SCREEN_SIZES.tablet - 1
    }px)`
  );
}

export function useIsLaptop(): boolean {
  return useMediaQuery(
    `(min-width: ${SCREEN_SIZES.tablet}px) and (max-width: ${
      SCREEN_SIZES.laptop - 1
    }px)`
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${SCREEN_SIZES.laptop}px)`);
}

// Hook to detect the current screen size category
export function useScreenSize(): "mobile" | "tablet" | "laptop" | "desktop" {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  const isDesktop = useIsDesktop();

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  if (isLaptop) return "laptop";
  return "desktop";
}
