<p>
	<span class="import">import</span>
	&nbsp;
	<span class="accolade">&#123;</span>
	&nbsp; sveltekit &nbsp;
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'@sveltejs/kit/vite'</span>;
</p>
<p>
	<span class="import">import</span>
	&nbsp;
	<span class="accolade">&#123;</span>
	&nbsp; defineConfig &nbsp;
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'vite'</span>;
</p>
<p>
	<span class="import">import</span>
	&nbsp;
	<span class="accolade">&#123;</span>
	&nbsp; lapikitPreprocess &nbsp;
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'lapikit/preprocess'</span>;
</p>

<p class="return-line"></p>

<p>
	<span class="import">export default</span>
	&nbsp;
	<span class="function">defineConfig</span>
	<span class="accolade">(</span>
	<span class="function-par">&#123;</span>
</p>
<p class="vs-indent-1">
	plugin
	<span class="param">:</span>
	&nbsp;
	<span class="var-name">[</span>
</p>
<p class="vs-indent-2">
	<span class="function">sveltekit</span>
	<span class="accolade">(</span>
	<span class="function-par">&#123;</span>
</p>

<p class="vs-indent-3">
	preprocess
	<span class="param">:</span>
	&nbsp;
	<span class="var-name">[</span>
	<span class="function">lapikitPreprocess</span>
	<span class="accolade">()</span>
	<span class="var-name">]</span>,
</p>

<p class="vs-indent-2">
	<span class="function-par">&#125;</span>
	<span class="accolade">)</span>
</p>
<p class="vs-indent-1">
	<span class="var-name">]</span>
</p>
<p>
	<span class="function-par">&#125;</span>
	<span class="accolade">)</span>;
</p>
