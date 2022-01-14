let commands = null;

function getCommands() {
  if (commands) {
    return commands;
  }

  commands = process.env.COMMANDS;
  if (!commands) {
    commands = [];
  } else {
    commands = commands.split(';')
  }
  return commands
}

module.exports = {
  getCommands,
};
