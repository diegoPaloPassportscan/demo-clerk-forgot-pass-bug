import { Clerk } from '@clerk/clerk-js';

/**
 * Simplified Clerk Callback Handler for Demo
 * Showcases the authentication validation flow
 */
class ClerkCallbackHandler {
    constructor() {
        this.clerk = null;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 [ClerkCallback] Initializing callback handler...');
            const publishableKey = window.clerkPublishableKey;

            if (!publishableKey) {
                throw new Error('Clerk publishable key not found');
            }
            console.log('✓ [ClerkCallback] Publishable key:', publishableKey.substring(0, 20) + '...');

            console.log('🔑 [ClerkCallback] Initializing Clerk...');
            this.clerk = new Clerk(publishableKey);
            await this.clerk.load();
            console.log('✓ [ClerkCallback] Clerk initialized');

            await this.authenticateUser();

        } catch (error) {
            console.error('❌ [ClerkCallback] Initialization failed:', error);
            this.showError('Failed to initialize authentication: ' + error.message);
        }
    }

    async authenticateUser() {
        try {
            // Step 1: Check if we have a Clerk session
            if (!this.clerk.session) {
                throw new Error('No active session found');
            }
            this.updateStatus('✓ Step 1: Session found');
            console.log('📋 Session:', this.clerk.session);

            // Step 2: Get the session token (JWT)
            this.updateStatus('✓ Step 2: Extracting session token...');
            const sessionToken = await this.clerk.session.getToken();

            if (!sessionToken) {
                throw new Error('Failed to get session token');
            }
            this.updateStatus('✓ Step 2: Token extracted successfully');
            console.log('🔑 Token (first 100 chars):', sessionToken.substring(0, 100) + '...');
            console.log('🔑 Full Token:', sessionToken);

            // Step 3: Get user data
            this.updateStatus('✓ Step 3: Retrieving user information...');
            const user = this.clerk.user;

            if (!user) {
                throw new Error('User data not available');
            }
            this.updateStatus(`✓ Step 3: User authenticated - ${user.primaryEmailAddress?.emailAddress || 'Unknown'}`);
            console.log('👤 User Object:', user);
            console.log('👤 User ID:', user.id);
            console.log('👤 Email:', user.primaryEmailAddress?.emailAddress);
            console.log('👤 Name:', user.fullName || user.firstName);

            // Step 4: Show session details
            this.updateStatus('✓ Step 4: Validation complete');
            console.log('📊 Session ID:', this.clerk.session.id);
            console.log('📊 Session Status:', this.clerk.session.status);
            console.log('📊 Last Active:', new Date(this.clerk.session.lastActiveAt).toLocaleString());

            // Step 5: Redirect to dashboard
            this.updateStatus('✓ All steps complete! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);

        } catch (error) {
            console.error('❌ Authentication Error:', error);
            this.showError(error.message);
        }
    }

    updateStatus(message) {
        const statusElement = document.getElementById('auth-status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    showError(message) {
        const authHeader = document.getElementById('auth-header');
        const loadingDiv = document.getElementById('loading');
        const errorDiv = document.getElementById('error');
        const errorMessage = document.getElementById('error-message');

        if (authHeader) authHeader.style.display = 'none';
        if (loadingDiv) loadingDiv.style.display = 'none';
        if (errorDiv) errorDiv.style.display = 'block';

        // Set error text
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ClerkCallbackHandler();
});
