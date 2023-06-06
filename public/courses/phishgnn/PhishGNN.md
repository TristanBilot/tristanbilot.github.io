<span class="date">Graph ML dataset</span>
# PhishGNN-22: a dataset for graph-based phishing detection
<div class="subtitle">What's in the dataset and how to complete it with new examples?</div>

<img src="/courses/phishgnn/img/main.png" class="header-img"></img>

<span class="link-quote"><a href="https://github.com/TristanBilot/phishGNN" target="_blank" rel="noopener noreferrer">The code is available on <i class="fab fa-github"></i> GitHub</a></span>

Most phishing website detection ML methods rely on URL, domain or content features. These data has shown impressive results in many research works.
Here, we describe PhishGNN-22, a dataset which carries URL, domain and content features along with the graph structure of websites. This dataset aims to be used in PoC graph-based machine learning and deep learning methods, like in the <a href="https://www.researchgate.net/publication/361002272_PhishGNN_A_Phishing_Website_Detection_Framework_using_Graph_Neural_Networks" target="_blank" rel="noopener noreferrer">original paper</a> that leverages Graph Neural Networks for semi-supervised graph classification.

## Dataset

The malicious URLs used in this dataset are extracted from <a  target="_blank" rel="noopener noreferrer" href="https://www.openphish.com/">OpenPhish</a> and <a  target="_blank" rel="noopener noreferrer" href="https://phishtank.org/">PhishTank</a>, while benign URLs come from <a  target="_blank" rel="noopener noreferrer" href="https://www.kaggle.com/datasets/cheedcheed/top1m">Alexa top-1M</a> sites dataset.

These extracted URLs are then passed into 2 filtering steps. The first consists in removing all dead pages (i.e. URLs forwarding to error pages), and the second is for only keeping URLs containing &lt;a&gt;, &lt;form&gt; or &lt;iframe&gt; tags in their page content.

A crawler is then used to build a graph and extract features from these URLs up to a defined depth (1 by default). A depth of $n$ means that the crawler traverses recursively all links, forms and iframes $n$ times from the root URL. Thus, a depth of 1 traverses only the root URL, not the children URLs. 

## Features

Features are extracted by the crawler along with the graph topology. The crawling task starts from the URL given in the dataset and explores recursively all children pages. For each child URL, a set of node features and edge features are collected.

### Node features

Node features are divided into 3 main categories:

- **lexical features:** extracted from the raw URL as text
- **content features:** extracted from the DOM content after fetching the URL
- **domain features:**  extracted from the DNS server

The graph structure is built based on the `refs` property which stores all the children URLs descending from the current URL. When using a depth >= 1, the URLs in `refs` will also be crawled and an entry for each URL will appear in the dataset.


| Lexical              | Content            | Domain               | Other       |
|----------------------|--------------------|----------------------|-------------|
| is_https             | redirects          | is_cert_valid        | url         |
| is_ip_address        | is_error_page      | has_dns_record       | depth       |
| url_length           | is_valid_html      | has_whois            | refs        |
| domain_url_depth     | anchors_count      | cert_country         | is_phishing |
| domain_url_length    | forms_count        | cert_reliability     |             |
| has_sub_domain       | javascript_count   | domain_age           |             |
| has_at_symbol        | self_anchors_count | domain_end_period    |             |
| dashes_count         | has_form_with_url  | domain_creation_date |             |
| path_starts_with_url | has_iframe         |                      |             |
|                      | use_mouseover      |                      |             |
|                      | status_code        |                      |             |

<div class="very-small-vertical-space"></div>

Note that any NaN value is substituted by $-1$ and continuous features are normalized with min-max normalization.

In the dataset, all root URLs and child URLs are together. To retrieve the original root URLs to classify, you just have to select rows with a `depth` = $0$. The rows with `depth` = $1$ are all child URLs.

**E.g.**

Select root URLs that are phishing:

<pre class="code-style"><code class="lang-python"> 
df = pd.read_csv("2333_phishing_11176_benign_crawled.csv")
df[(df["depth"] == 0) & (df["is_phishing"] == 1)]
</code></pre>

### Edge features

An edge $(u, v)$ exists only if a &lt;a&gt;, &lt;form&gt; or &lt;iframe&gt; tag mapping to a child page $v$ exists in the root page $u$. From the perspective of the root page, 4 lexical features are computed for the child page and become an edge feature vector.

| Lexical | Other |
|-------------| -------------|
| is_form |url |
| is_anchor |
| is_iframe |
| is_same_domain |

### Example

<img src="/courses/phishgnn/img/example.png" class="course-img large-course-img"></img>
<div class="caption">Example of extracted features on www.google.com. refs represent a list of children page URLs with edge features. </div>

## Statistics

- **Graphs:** 4,633 (2300 benign, 2333 phishing)
- **Nodes:** 90 average, 31 median (from 1 to 5185 nodes)
- **Edges:** 138 average, 45 median (from 0 to 5214 edges)

It is hard to find many phishing websites because of their short lifetime. Most URLs found in online datasets are old and the websites have been deleted since. However, it may be possible to grow the size of this dataset by fetching everyday new phishing URLs from PhishTank and OpenPhish, in an automatic batch mode. Benign URLs, on the other hand can be obtained easily from public datasets.

## Crawling new websites

The crawler is provided in order to add new examples to the initial small dataset. It is developed in `Rust` for efficiency concerns (i.e. Python is terribly slow for crawling tasks). The data extracted by the crawler is stored in a local `mongoDB` database, easy and fast to install.

### Prerequisites

- install <a  target="_blank" rel="noopener noreferrer" href="https://www.rust-lang.org/tools/install">Rust</a>
- install <a  target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/docs/manual/installation/">mongodb</a>
- start mongodb service

### Installation

Open a terminal, start a mongodb shell and create the `phishing` database.

<pre class="code-style"><code class="lang-bash"> 
$ mongosh
$ use phishing
</code></pre>

<img src="/courses/phishgnn/img/term1.png" class="course-img large-course-img"></img>

Open a second terminal, clone the PhishGNN GitHub project and compile the Rust crawler.

<pre class="code-style"><code class="lang-bash"> 
$ git clone https://github.com/TristanBilot/phishGNN.git
$ cd phishGNN/crawler
$ cargo build
</code></pre>

<img src="/courses/phishgnn/img/term2.png" class="course-img large-course-img"></img>

Run the compiled binary.

<img src="/courses/phishgnn/img/term3.png" class="course-img large-course-img"></img>

#### Add one URL to crawl

<pre class="code-style"><code class="lang-bash"> 
$ cargo run add https://my-url.com
$ cargo run core # extract lexical + content features
$ cargo run domain # extract domain features
</code></pre>

After adding one URL to the crawling queue with `add` and extracting the graph and features with `core` and `domain`, go back to the first terminal with the mongodb shell. Run `db.pages.find()` to list the crawled URLs.

<img src="/courses/phishgnn/img/term4.png" class="course-img large-course-img"></img>

<img src="/courses/phishgnn/img/term5.png" class="course-img large-course-img"></img>

#### Add multiple URLs to crawl

Multiple URLs can be added to the crawling queue at the same time, either by using a space to separate URLs in the terminal, or more conveniently by writing all space-separated URLs in a file and giving this file content as input to the `add` command.

<pre class="code-style"><code class="lang-bash"> 
$ echo "https://stackoverflow.com https://youtube.com" > input.txt
$ cargo run add $(&ltinput.txt)
</code></pre>

#### Export data

After crawling, the data can be exported as CSV for downstream graph ML experiments.

<pre class="code-style"><code class="lang-bash"> 
$ cargo run extract > dataset.csv
</code></pre>

## License

To whom intent the use of the PhishGNN-22 dataset, the authors have to cite the following paper:

```
@article{bilotphishgnn,
  title={PhishGNN: A Phishing Website Detection Framework using Graph Neural Networks},
  author={Bilot, Tristan and Geis, Gr{\'e}goire and Hammi, Badis}
}
```

## Download

The original PhishGNN-22 dataset is **only** available under Pytorch Geometric (PyG) <a href="https://pytorch-geometric.readthedocs.io/en/latest/notes/create_dataset.html" target="_blank" rel="noopener noreferrer"> dataset format</a> (i.e. using processed .pt files).

<a href="/courses/phishgnn/phishgnn-22.zip"> <i class="fa fa-download" aria-hidden="true"></i> Download file (.zip)</a> ~40MB

<!-- **Another dataset with more benign examples is available in CSV format:**

13,509 graphs (2333 phishing, 11176 benign)

<a href="/courses/phishgnn/2333_phishing_11176_benign_crawled.csv" download="2333_phishing_11176_benign_crawled.csv"> <i class="fa fa-download" aria-hidden="true"></i> Download file (.csv)</a> ~400MB -->
