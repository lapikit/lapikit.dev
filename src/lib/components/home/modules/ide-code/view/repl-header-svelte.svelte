<!-- SCRIPT -->
<p>
	<span class="char">&lt;</span>
	<span class="dom">script</span>
	&nbsp;
	<span class="param">lang</span>
	=
	<span class="param">"ts"</span>
	<span class="char">&gt;</span>
</p>

<p class="vs-indent-1">
	<span class="import">import</span>
	&nbsp;
	<span class="accolade">&#123;</span>
	&nbsp; createGlobalTheme, useTheme &nbsp;
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'lapikit/actions'</span>;
</p>

<p class="return-line"></p>

<p class="vs-indent-1">
	<span class="import">import</span>
	&nbsp; Logo &nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'$lib/assets/images/lapikit.webp'</span>;
</p>
<p class="vs-indent-1">
	<span class="import">import</span>
	&nbsp;
	<span class="accolade">&#123;</span>
	&nbsp; Moon, Sun &nbsp;
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="import">from</span>
	&nbsp;
	<span class="path">'lucide-svelte'</span>;
</p>

<p class="return-line"></p>

<p class="vs-indent-1">
	<span class="const">const</span>
	&nbsp;
	<span class="var-name">app</span>
	&nbsp; = &nbsp;
	<span class="function">createGlobalTheme</span>
	<span class="accolade">()</span>;
</p>

<p>
	<span class="char">&lt;/</span>
	<span class="dom">script</span>
	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>
<p class="return-line"></p>

<p class="vs-indent-1">
	<span class="char">&lt;</span>
	<span class="dom">kit:appbar</span>
	&nbsp;
	<span class="param">density</span>
	=
	<span class="param">"compact"</span>
	&nbsp;
	<span class="param">elevation</span>
	=
	<span class="param">"2"</span>

	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">img</span>
	&nbsp;
	<span class="param">src</span>
	=
	<span class="accolade">&#123;</span>
	<span class="var-name">Logo</span>
	<span class="accolade">&#125;</span>
	&nbsp;
	<span class="param">alt</span>
	=
	<span class="param">"alt logo lapikit"</span>
	<span class="char">/&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">kit:spacer</span>
	<span class="char">/&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">kit:btn</span>
	&nbsp;
	<span class="param">variant</span>
	=
	<span class="param">"text"</span>
	&nbsp;
	<span class="param">size</span>
	=
	<span class="param">"sm"</span>
	<span class="low">&gt;</span>
</p>
<p class="vs-indent-3">Features</p>
<p class="vs-indent-2">
	<span class="char">&lt;/</span>
	<span class="dom">kit:btn</span>
	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">kit:btn</span>
	&nbsp;
	<span class="param">variant</span>
	=
	<span class="param">"text"</span>
	&nbsp;
	<span class="param">size</span>
	=
	<span class="param">"sm"</span>
	<span class="char">&gt;</span>
</p>
<p class="vs-indent-3">About</p>
<p class="vs-indent-2">
	<span class="char">&lt;/</span>
	<span class="dom">kit:btn</span>
	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">kit:btn</span>
	&nbsp; &nbsp;
	<span class="param">size</span>
	=
	<span class="param">"sm"</span>
	<span class="char">&gt;</span>
</p>
<p class="vs-indent-3">Discover</p>
<p class="vs-indent-2">
	<span class="char">&lt;/</span>
	<span class="dom">kit:btn</span>
	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-2">
	<span class="char">&lt;</span>
	<span class="dom">kit:btn</span>
	&nbsp;
	<span class="param">size</span>
	=
	<span class="param">"sm"</span>
	&nbsp;
	<span class="param">icon</span>
	&nbsp;
	<span class="param">onclick</span>
	=
	<span class="accolade">&#123;</span>
	<span class="function">()</span>
	<span class="instruction">&nbsp; => &nbsp;</span>
	<span class="function">useTheme(</span>
	&nbsp;
	<span class="var-name">app.active</span>
	&nbsp; === &nbsp; 'dark' &nbsp; ? &nbsp; 'light' &nbsp; : &nbsp; 'dark'
	<span class="function">)</span>
	<span class="accolade">&#125;</span>
	<span class="char">&gt;</span>
</p>
<p class="vs-indent-3">
	<span class="char">&lt;</span>
	<span class="dom">kit:icon</span>
	<span class="char">&gt;</span>
</p>
<p class="vs-indent-4">
	<span class="accolade">&#123;</span>
	#
	<span class="function">if</span>
	&nbsp;
	<span class="var-name">app.active</span>
	&nbsp; === &nbsp;
	<span class="param">'dark' &nbsp;</span>
	<span class="accolade">&#125;</span>
</p>
<p class="vs-indent-5">
	<span class="char">&lt;</span>
	<span class="dom">Sun</span>
	<span class="char">/&gt;</span>
</p>
<p class="vs-indent-4">
	<span class="accolade">&#123;</span>
	:
	<span class="function">else &nbsp;</span>
	<span class="accolade">&#125;</span>
</p>
<p class="vs-indent-5">
	<span class="char">&lt;</span>
	<span class="dom">Moon</span>
	<span class="char">/&gt;</span>
</p>
<p class="vs-indent-4">
	<span class="accolade">&#123;</span>
	/
	<span class="function">if &nbsp;</span>
	<span class="accolade">&#125;</span>
</p>

<p class="vs-indent-3">
	<span class="char">&lt;/</span>
	<span class="dom">kit:icon</span>
	<span class="char">&gt;</span>
</p>
<p class="vs-indent-2">
	<span class="char">&lt;/</span>
	<span class="dom">kit:btn</span>
	<span class="char">&gt;</span>
</p>

<p class="return-line"></p>

<p class="vs-indent-1">
	<span class="char">&lt;/</span>
	<span class="dom">kit:appbar</span>
	<span class="char">&gt;</span>
</p>

<!-- STYLES -->
<p class="return-line"></p>
<p class="return-line"></p>

<p>
	<span class="char">&lt;</span>
	<span class="dom">style</span>
	<span class="char">&gt;</span>
</p>

<p class="vs-indent-1">
	<span class="css-dom">img &nbsp;</span>
	<span class="accolade">&#123;</span>
</p>
<p class="vs-indent-2">
	<span class="css-param">max-height</span>:
	<span class="css-value-num">&nbsp; 32px</span>;
</p>
<p class="vs-indent-1">
	<span class="accolade">&#125;</span>
</p>

<p>
	<span class="char">&lt;/</span>
	<span class="dom">style</span>
	<span class="char">&gt;</span>
</p>
