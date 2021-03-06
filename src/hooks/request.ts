import type { App } from "vue";
import { ElLoading } from 'element-plus'
import { ElNotification } from 'element-plus'

export async function request(config: {method: string, url: string, body?: any, params?: any}, options: { baseUrl?: string, async?: boolean } = { baseUrl: '/admin' }): Promise<any> {
    const { method, url, body, params } = config;
    let requrl = "";
    if (options) {
        requrl = options.baseUrl + url;
    }
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    config.body = JSON.stringify(config.body)
    if (window.fetch) {
        if(params) {
            requrl = requrl + '?' + new URLSearchParams(params);
        }
        const res = await window.fetch(requrl, {
            ...config,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        try {
            const data = await res.json();
            if (res.ok && res.status >= 200 && res.status < 300) {
                let temp;
                if(data.code || data.data) {
                    data.code = 200;
                    temp = data;
                } else {
                    temp = {data, code: 200};
                }
                return temp;
            } else {
                ElNotification.error({
                    title: "error",
                    message: data?.message || `code: ${res.status}, request failed`,
                });
                let temp;
                if(data.code || data.data) {
                    data.code = 200;
                    temp = data;
                } else {
                    temp = {data, code: 200};
                }
                return temp;
            }
        } catch (error) {
            console.error(error);
            return { data: error, code: res.status };
        } finally {
            loading.close();
        }
    } else {
        return new Promise((resolve, reject) => {
            let req: InstanceType<typeof XMLHttpRequest>;
            req = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
            req.open(method, requrl, options?.async || true);
            if (method === "post") {
                req.send(JSON.stringify(body));
            }
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status >= 200 && req.status < 300) {
                    let res = req.response;
                    if (typeof res !== "object") {
                        res = JSON.stringify(res);
                    }
                    resolve({ data: res, code: res.status })
                } else {
                    reject({ data: req.response, status: req.status })
                }
                loading.close();
            };
        })
    };
}

export default function (
    app: App,
    options?: { baseUrl?: string; async?: boolean }
): void {
    app.config.globalProperties.$http = (config: Request) => request(config, options);
}