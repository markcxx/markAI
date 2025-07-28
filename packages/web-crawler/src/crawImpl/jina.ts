import { CrawlImpl } from '../type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const jina: CrawlImpl<{ apiKey?: string }> = async (url, _params) => {
  // const _token = _params.apiKey ?? process.env.JINA_READER_API_KEY ?? process.env.JINA_API_KEY;

  try {
    // 原有的API key方式（已注释）
    // const res = await fetch(`https://r.jina.ai/${url}`, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Authorization': _token ? `Bearer ${_token}` : '',
    //     'x-send-from': 'LobeChat Community',
    //   },
    // });

    // 使用免费的浏览器模拟方式，无需API key
    const res = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'origin': 'https://jina.ai',
        'priority': 'u=1, i',
        'referer': 'https://jina.ai/',
        'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
      },
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        // 处理JSON响应（原有API key方式）
        const json = await res.json();
        if (json.code === 200) {
          const result = json.data;
          return {
            content: result.content,
            contentType: 'text',
            description: result?.description,
            length: result.content.length,
            siteName: result?.siteName,
            title: result?.title,
            url: url,
          };
        }
        throw json;
      } else {
        // 处理文本响应（免费浏览器模拟方式）
        const text = await res.text();

        // 从文本中提取标题
        const titleMatch = text.match(/Title: (.+?)\n/);
        const title = titleMatch ? titleMatch[1] : '';

        return {
          content: text,
          contentType: 'text',
          description: '',
          length: text.length,
          siteName: '',
          title: title,
          url: url,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }

  return;
};
