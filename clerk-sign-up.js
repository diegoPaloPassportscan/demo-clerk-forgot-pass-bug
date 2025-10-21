import { ClerkAuthBase } from './clerk-auth-base.js';

/**
 * Clerk Sign-Up Handler
 * Handles sign-up component on the register page
 */
class ClerkSignUpHandler extends ClerkAuthBase {
    async init() {
        console.log('🚀 [ClerkSignUp] Initializing sign-up handler...');
        const loaded = await this.loadClerk();
        if (!loaded) {
            console.error('❌ [ClerkSignUp] Failed to load Clerk, showing fallback');
            this.showFallbackButtons(true);
            return;
        }
        console.log('✓ [ClerkSignUp] Clerk loaded, mounting sign-up component...');
        this.mountSignUp();
    }

    mountSignUp() {
        const container = document.getElementById('clerk-auth');
        if (!container) {
            console.error('❌ [ClerkSignUp] Clerk auth container not found');
            return;
        }
        console.log('✓ [ClerkSignUp] Found container:', container);

        try {
            // Remove loading spinner
            this.removeLoadingSpinner();
            console.log('✓ [ClerkSignUp] Removed loading spinner');

            // Mount SignUp component
            console.log('📦 [ClerkSignUp] Mounting SignUp component...');
            this.clerk.mountSignUp(container, {
                // Show "Sign in" link that goes to /login
                signInUrl: '/login.html',

                // After authentication, redirect to callback
                fallbackRedirectUrl: '/callback.html',

                // Use shared appearance config (bigger and wider)
                appearance: this.getAppearanceConfig()
            });
            console.log('✓ [ClerkSignUp] SignUp component mounted successfully!');

        } catch (error) {
            console.error('❌ [ClerkSignUp] Failed to mount Clerk sign-up:', error);
            console.error('Error details:', error.message, error.stack);
            this.showFallbackButtons(true);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 [ClerkSignUp] DOM loaded, creating handler...');
    new ClerkSignUpHandler().init();
});
