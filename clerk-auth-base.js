/**
 * Base class for Clerk authentication components
 * Shared between sign-in and sign-up pages
 */
export class ClerkAuthBase {
    constructor() {
        this.clerkPublishableKey = null;
        this.clerk = null;
    }

    async loadClerk() {
        console.log('🔧 [ClerkAuthBase] Starting loadClerk()...');
        
        // Get Clerk configuration from global config
        if (!window.clerkConfigVars) {
            console.error('❌ [ClerkAuthBase] Clerk configuration not found in window.clerkConfigVars');
            return false;
        }
        console.log('✓ [ClerkAuthBase] Found clerkConfigVars:', window.clerkConfigVars);

        this.clerkPublishableKey = window.clerkConfigVars.publishableKey;

        if (!this.clerkPublishableKey) {
            console.error('❌ [ClerkAuthBase] Clerk publishable key not found');
            return false;
        }
        console.log('✓ [ClerkAuthBase] Publishable key:', this.clerkPublishableKey.substring(0, 20) + '...');

        try {
            console.log('📦 [ClerkAuthBase] Importing @clerk/clerk-js...');
            // Dynamic import of Clerk SDK (Vite will handle this)
            const { Clerk } = await import('@clerk/clerk-js');
            console.log('✓ [ClerkAuthBase] Clerk SDK imported successfully');

            // Initialize Clerk with publishable key
            console.log('🔑 [ClerkAuthBase] Initializing Clerk...');
            this.clerk = new Clerk(this.clerkPublishableKey);
            await this.clerk.load();
            console.log('✓ [ClerkAuthBase] Clerk loaded successfully');

            // Store globally for other functions to access
            window.Clerk = this.clerk;

            return true;
        } catch (error) {
            console.error('❌ [ClerkAuthBase] Failed to load Clerk:', error);
            console.error('Error details:', error.message, error.stack);
            return false;
        }
    }

    removeLoadingSpinner() {
        const container = document.getElementById('clerk-auth');
        if (container) {
            const loader = container.querySelector('.clerk-loading');
            if (loader) {
                loader.remove();
            }
            // Reset container styles for the component
            container.style.minHeight = 'auto';
            container.classList.remove('d-flex', 'justify-content-center', 'align-items-center');
        }
    }

    showFallbackButtons(isSignUp = false) {
        console.log('⚠️ [ClerkAuthBase] Showing fallback buttons (Clerk failed to load)');
        const container = document.getElementById('clerk-auth');
        if (container) {
            const frontendApi = window.clerkConfigVars?.frontendApi || '';
            const callbackUrl = encodeURIComponent(window.location.origin + '/callback.html');

            container.innerHTML = !isSignUp ? `
            <div style="width: 400px; display:block; margin: 0 auto">
                <div class="pb-13 pt-lg-0 pt-5">
                    <h3 class="font-weight-bolder text-primary font-size-h4 font-size-h1-lg">
                        Clerk Demo
                    </h3>
                    <p class="text-muted font-weight-bold font-size-h4">
                        Sign in to your account or <a href="${frontendApi}/sign-up?redirect_url=${callbackUrl}">
                            Sign Up
                        </a> a new one
                    </p>
                </div>
                <a href="${frontendApi}/sign-in?redirect_url=${callbackUrl}"
                   class="btn btn-primary font-weight-bolder font-size-h6 w-100 mb-4 px-10">
                    <i class="fas fa-sign-in-alt me-2"></i>Sign In
                </a>
            </div>
            ` : `
            <div style="width: 400px; display:block; margin: 0 auto">
                <div class="pb-13 pt-lg-0 pt-5">
                    <h3 class="font-weight-bolder text-primary font-size-h4 font-size-h1-lg">
                        Clerk Demo
                    </h3>
                    <p class="text-muted font-weight-bold font-size-h4">
                        Sign up to create a new account or <a href="${frontendApi}/sign-in?redirect_url=${callbackUrl}">
                            Sign In
                        </a> to an existing one
                    </p>
                </div>
                <a href="${frontendApi}/sign-up?redirect_url=${callbackUrl}"
                   class="btn btn-primary font-weight-bolder font-size-h6 w-100 mb-4 px-10">
                    <i class="fas fa-user-plus me-2"></i>Sign Up
                </a>
            </div>
            `;
        }
    }

    /**
     * Shared appearance configuration for all auth components
     * Applies brand colors while letting Clerk's defaults handle sizing
     */
    getAppearanceConfig() {
        return {
            elements: {
                logoImage: { width: '75px', height: '75px' },
            },
            variables: {
                // Brand colors
                colorPrimary: '#423D5C',           // Primary brand color
                colorBackground: '#ffffff',         // White background
                colorInputBackground: '#ffffff',    // White input fields
                colorInputText: '#212126'          // Dark text in inputs
            }
        };
    }
}
