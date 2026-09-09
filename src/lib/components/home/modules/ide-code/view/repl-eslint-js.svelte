<p>
	<span class="import">import</span>
	&nbsp; js &nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'@eslint/js'</span>;
</p>
<p>
	<span class="import">import</span>
	&nbsp; ts &nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'typescript-eslint'</span>;
</p>
<p>
	<span class="import">import</span>
	&nbsp; svelte &nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'eslint-plugin-svelte'</span>;
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
	<span class="path">'eslint/config'</span>;
</p>
<p>
	<span class="import">import</span>
	&nbsp; lapikitConfig &nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'eslint-config-lapikit'</span>;
</p>

<p class="return-line"></p>

<p>
	<span class="import">export default</span>
	&nbsp;
	<span class="function">defineConfig</span>
	<span class="accolade">(</span>
</p>
<p class="vs-indent-1">
	...lapikitConfig
	<span class="accolade">,</span>
</p>
<p class="vs-indent-1">
	<span class="var-name">js</span>
	<span class="accolade">.</span>
	<span class="var-name">configs</span>
	<span class="accolade">.</span>
	<span class="var-name">recommended</span>
	<span class="accolade">,</span>
</p>
<p class="vs-indent-1">
	<span class="var-name">ts</span>
	<span class="accolade">.</span>
	<span class="var-name">configs</span>
	<span class="accolade">.</span>
	<span class="var-name">recommended</span>
	<span class="accolade">,</span>
</p>
<p class="vs-indent-1">
	<span class="var-name">svelte</span>
	<span class="accolade">.</span>
	<span class="var-name">configs</span>
	<span class="accolade">.</span>
	<span class="var-name">recommended</span>
	<span class="accolade">,</span>
</p>
<p>
	<span class="accolade">)</span>
</p>
