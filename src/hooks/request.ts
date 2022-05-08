import type { App } from "vue";
import { ElLoading } from 'element-plus'
import { ElNotification } from 'element-plus'

export async function request(config: {method: string, url: string, body?: any}, options: { baseUrl?: string, async?: boolean } = { baseUrl: '/admin' }): Promise<{ data: any; code: number }> {
    const { method, url, body } = config;
    let requrl = "";
    if (options) {
        requrl = options.baseUrl + url;
    }
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    if (window.fetch) {
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
                return { data, code: res.status };
            } else {
                ElNotification.error({
                    title: "error",
                    message: data?.message || `code: ${res.status}, request failed`,
                });
                return { data: data.data, code: res.status };
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