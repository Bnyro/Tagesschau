<div class="spin" />

<style>
	:root {
		--progress-size: 3rem;
	}

	.spin {
		display: inline-block;
		border: 4px solid transparent;
		border-top-color: var(--accent);
		width: var(--progress-size);
		height: var(--progress-size);
		border-radius: 50%;
		animation: spin 1.8s infinite;
		transform: translateZ(0);
		text-indent: -9999em;
	}

	@keyframes spin {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
