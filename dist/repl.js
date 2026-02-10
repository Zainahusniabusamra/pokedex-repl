export async function startREPL(state) {
    // تفعيل الـ prompt في البداية
    state.rl.prompt();
    state.rl.on("line", async (line) => {
        const cleanedLine = line.trim();
        if (cleanedLine === "") {
            state.rl.prompt();
            return;
        }
        const parts = cleanedLine.split(" ");
        const commandName = parts[0];
        const args = parts.slice(1);
        const command = state.commands[commandName];
        if (command) {
            try {
                await command.callback(state, args);
            }
            catch (err) {
                console.log("An error occurred");
            }
        }
        else {
            console.log("Unknown command");
        }
        // إعادة الـ prompt فقط إذا كان البرنامج لا يزال يعمل
        state.rl.prompt();
    });
}
