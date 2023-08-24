class Utils {
    static async changeDriverContext(contextString: string): Promise<void> {
        await driver.waitUntil(async () => {
            const contexts = await driver.getContexts();
            if (!(await driver.getContext()).includes(contextString)) {
                for (const entry of contexts) {
                    if (entry.toLocaleLowerCase().includes(contextString)) {
                        await driver.switchContext(entry);
                        return true;
                    }
                }
                return false;
            }
        });
    }
}

export default Utils;