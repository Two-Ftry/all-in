
export const fetchItem = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `jianfeng_huang-${id}`
            });
        }, 500)
    })
}