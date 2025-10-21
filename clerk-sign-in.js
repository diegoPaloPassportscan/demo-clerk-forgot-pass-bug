import { ClerkAuthBase } from './clerk-auth-base.js';

/**
 * Clerk Sign-In Handler
 * Handles sign-in component on the login page
 */
class ClerkSignInHandler extends ClerkAuthBase {
    async init() {
        console.log('🚀 [ClerkSignIn] Initializing sign-in handler...');
        const loaded = await this.loadClerk();
        if (!loaded) {
            console.error('❌ [ClerkSignIn] Failed to load Clerk, showing fallback');
            this.showFallbackButtons(false);
            return;
        }
        console.log('✓ [ClerkSignIn] Clerk loaded, mounting sign-in component...');
        this.mountSignIn();
    }

    mountSignIn() {
        const container = document.getElementById('clerk-auth');
        if (!container) {
            console.error('❌ [ClerkSignIn] Clerk auth container not found');
            return;
        }
        console.log('✓ [ClerkSignIn] Found container:', container);

        try {
            // Remove loading spinner
            this.removeLoadingSpinner();
            console.log('✓ [ClerkSignIn] Removed loading spinner');

            // Mount SignIn component
            console.log('📦 [ClerkSignIn] Mounting SignIn component...');
            this.clerk.mountSignIn(container, {
                // After authentication, redirect to callback
                fallbackRedirectUrl: '/callback.html',

                // Use shared appearance config (bigger and wider)
                appearance: this.getAppearanceConfig()
            });
            console.log('✓ [ClerkSignIn] SignIn component mounted successfully!');

        } catch (error) {
            console.error('❌ [ClerkSignIn] Failed to mount Clerk sign-in:', error);
            console.error('Error details:', error.message, error.stack);
            this.showFallbackButtons(false);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 [ClerkSignIn] DOM loaded, creating handler...');
    new ClerkSignInHandler().init();
});
