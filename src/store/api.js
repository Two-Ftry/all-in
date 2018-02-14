
export const fetchItem = (id) => {
    return new Promise((resolve) => {
        resolve({
            id,
            name: `jianfeng_huang-${id}`
        });
    })
}