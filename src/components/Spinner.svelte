<div class="spin-container">
	<div class="spin" />
</div>

<style>
	:root {
		--progress-size: 3rem;
	}

	.spin-container {
		box-sizing: content-box;
		background: -webkit-linear-gradient(left top, var(--primary) 0%, var(--secondary) 100%);
		width: var(--progress-size);
		height: var(--progress-size);
		border-radius: 50%;
		padding: calc(var(--progress-size) / 10);
		animation: spin infinite linear 2s;
	}

	.spin {
		background: var(--bg);
		width: var(--progress-size);
		height: var(--progress-size);
		border-radius: 50%;
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
