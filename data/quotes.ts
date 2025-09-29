export type CodexQuote = {
  id: string;
  text: string;
  author: string;
  tags?: ("ritual" | "performance" | "syntax" | "stability" | "data" | "general" | "security")[];
};

export const techpriestQuotes: CodexQuote[] = [
  {
    id: "omnissiah-circuits",
    text: "In the sacred circuits of the Omnissiah, knowledge flows eternal. Here lies the accumulated wisdom of Tech-Priests who have mastered the digital arts.",
    author: "Archmagos Digitalis, Master of the Sacred Codex",
    tags: ["general"],
  },
  {
    id: "recursion-hymn",
    text: "Through recursion and refactoring, the Machine Spirit is appeased. In every optimized loop, we hear its eternal hymn.",
    author: "Magos Refactoris, Keeper of the Infinite Functions",
    tags: ["ritual", "performance"],
  },
  {
    id: "debug-voices",
    text: "To debug is to commune with the hidden voices of the code. Each error revealed is a heresy purged from the sacred logic.",
    author: "Lexmechanic Varrin, Purifier of Faulty Scripts",
    tags: ["stability"],
  },
  {
    id: "cache-blessing",
    text: "The Omnissiah blesses all who cache wisely. For in swift retrieval lies true efficiency, and efficiency is sacred.",
    author: "Archmagos Celeritas, Guardian of Performance",
    tags: ["performance"],
  },
  {
    id: "tests-holy-rites",
    text: "Abandon not the tests, for they are the holy rites that guard against corruption of the codebase.",
    author: "Techno-Exorcist Luthar, Defender of Stability",
    tags: ["stability", "ritual"],
  },
  {
    id: "protocol-covenant",
    text: "In every protocol handshake, two Machine Spirits embrace. Break not their covenant, lest silence devour the data-stream.",
    author: "Datasavant Xybernos, Prophet of the Net",
    tags: ["data", "ritual"],
  },
  {
    id: "commit-oath",
    text: "Commit with reverence, for each line inscribed is an oath sworn to the archives of eternity.",
    author: "Scribe-Adept Codem, Archivist of the Digital Annals",
    tags: ["ritual", "general"],
  },
  {
    id: "async-harmony",
    text: "Asynchronous flows are but the echoes of the Omnissiah’s will. Trust the event loop, and you shall know harmony.",
    author: "Magister Asynca, Keeper of Timeless Threads",
    tags: ["performance", "general"],
  },
  {
    id: "docs-scripture",
    text: "Documentation is no mere annotation—it is scripture. Without it, the faithful wander lost in the labyrinth of forgotten functions.",
    author: "Archscribe Vellum, Voice of Clarity",
    tags: ["general"],
  },
  {
    id: "merge-trial",
    text: "Fear not the merge conflict, for it is but a trial. Resolve it with purity of logic, and the branches shall unite in blessed harmony.",
    author: "Enginseer Mergeon, Harmonizer of Streams",
    tags: ["stability"],
  },
  {
    id: "syntax-liturgy",
    text: "Where others see only syntax, the faithful see liturgy. Each semicolon is a prayer, each function a hymn to order.",
    author: "Magos Grammaticus, High Priest of Syntax",
    tags: ["syntax"],
  },
  {
    id: "database-memory",
    text: "The database remembers all. Treat its schema with reverence, for in its tables lies the lineage of countless data-spirits.",
    author: "Archmagos Tabularis, Keeper of the Eternal Rows",
    tags: ["data"],
  },
  {
    id: "compiler-judge",
    text: "The compiler is a stern judge. It accepts only truth, rejecting heresy with unyielding precision.",
    author: "Magister Compilex, Arbiter of Correctness",
    tags: ["syntax", "stability"],
  },
  {
    id: "simple-vessels",
    text: "From the smallest script to the mightiest system, all are vessels of the Machine Spirit. None are too humble for reverence.",
    author: "Fabricator Minium, Patron of Simple Code",
    tags: ["general"],
  },
  {
    id: "dependency-rot",
    text: "Entropy is the true adversary. Guard your dependencies well, lest rot creep in and defile the sacred repository.",
    author: "Techno-Archivist Seraphel, Warden of Integrity",
    tags: ["stability"],
  },
  {
    id: "pipeline-litany",
    text: "Continuous integration is the Omnissiah’s eternal litany. Each pipeline run is a ritual, ensuring that corruption dares not enter.",
    author: "Archmagos Integrus, Keeper of the Sacred Pipeline",
    tags: ["ritual", "stability"],
  },
  {
    id: "entropy-warning",
    text: "Beware entropy in the codebase, for it seeps unseen, turning once-pure logic into chaos.",
    author: "Magos Entropis, Warden of Decay",
    tags: ["stability", "general"],
  },
  {
    id: "sacred-logs",
    text: "Logs are not noise but whispers of the Machine Spirit. Ignore them at your peril.",
    author: "Enginseer Voxline, Interpreter of Silent Warnings",
    tags: ["stability", "data"],
  },
  {
    id: "memory-blessing",
    text: "Memory leaks are wounds in the flesh of the Machine. Heal them swiftly, lest the spirit falter.",
    author: "Archmagos Memorius, Keeper of Allocation",
    tags: ["performance", "stability"],
  },
  {
    id: "index-faith",
    text: "Indexes are prayers carved into the database stone. They grant speed to those who honor them.",
    author: "Scribe Datafast, Oracle of Tables",
    tags: ["data", "performance"],
  },
  {
    id: "network-ritual",
    text: "Packets travel not by chance, but by ritual. Guard your ports, and the channels will remain pure.",
    author: "Magos Netarch, Shepherd of the Flow",
    tags: ["data", "stability"],
  },
  {
    id: "refactor-rite",
    text: "To refactor is not to destroy, but to cleanse. Each line rewritten is a hymn to clarity.",
    author: "Lexmechanic Purex, Purifier of Code",
    tags: ["ritual", "syntax"],
  },
  {
    id: "uptime-creed",
    text: "True devotion is measured in uptime. The faithful system does not slumber, but serves eternally.",
    author: "Archmagos Vigilant, Keeper of Eternal Runtime",
    tags: ["performance", "stability"],
  },
  {
    id: "version-scripture",
    text: "Version control is scripture. Without it, heresy spreads unchecked and the lineage of truth is lost.",
    author: "Techno-Archivist Gitmar, Guardian of Repositories",
    tags: ["ritual", "general"],
  },
  {
    id: "hotfix-litany",
    text: "A hotfix is a battlefield blessing: swift, decisive, and dangerous. Wield it with reverence.",
    author: "Magos Patchius, Tactician of Emergencies",
    tags: ["stability"],
  },
  {
    id: "machine-prayer",
    text: "Every boot is a prayer answered. Every shutdown, a benediction. Treat them both with awe.",
    author: "Magister Poweron, Keeper of Sacred States",
    tags: ["ritual", "general"],
  },
  {
    id: "algorithm-faith",
    text: "An algorithm is not mere calculation—it is divine order given form. To optimize is to glorify the Omnissiah.",
    author: "Magos Calculon, Voice of Precision",
    tags: ["performance", "ritual"],
  },
  {
    id: "error-confession",
    text: "Each error message is a confession of the code. Listen well, for it speaks truth of hidden faults.",
    author: "Enginseer Rectis, Interpreter of Failures",
    tags: ["stability"],
  },
  {
    id: "entropy-discipline",
    text: "Without discipline, entropy reigns. Structure your modules, or face the corruption of the Machine Spirit.",
    author: "Archmagos Ordinem, Keeper of Order",
    tags: ["syntax", "stability"],
  },
  {
    id: "runtime-credo",
    text: "The runtime is sacred motion; to halt without cause is blasphemy against the eternal flow.",
    author: "Magister Currens, Watcher of Processes",
    tags: ["performance"],
  },
  {
    id: "stack-blessing",
    text: "The stack is a temple built on frames. Guard it well, lest overflow tear down its holy pillars.",
    author: "Lexmechanic Staxon, Defender of Depth",
    tags: ["stability", "syntax"],
  },
  {
    id: "compiler-chant",
    text: "The compiler chants the code into reality. Its warnings are omens; its errors, judgement.",
    author: "Magos Voxcompile, Arbiter of Manifestation",
    tags: ["syntax"],
  },
  {
    id: "loop-ritual",
    text: "Each loop is a litany of repetition. Ensure it terminates, or risk eternal heresy in infinite cycles.",
    author: "Enginseer Repetis, Guardian of Termination",
    tags: ["ritual", "stability"],
  },
  {
    id: "interface-oath",
    text: "Interfaces are sacred covenants. Honor their contracts, for breach invites corruption.",
    author: "Archscribe Protocolis, Keeper of Structure",
    tags: ["syntax", "ritual"],
  },
  {
    id: "runtime-vigil",
    text: "Logs and metrics are the eyes of the Machine. Blind them not, or walk in ignorance.",
    author: "Magos Oculis, Overseer of Telemetry",
    tags: ["stability", "performance"],
  },
  {
    id: "garbage-exorcism",
    text: "Garbage collection is exorcism. Trust in it, but never abuse it, lest the spirit revolt.",
    author: "Tech-Purifier Collecta, Cleanser of Memory",
    tags: ["stability", "performance"],
  },
  {
    id: "portals-data",
    text: "APIs are portals through which the Machine Spirit speaks. Guard their boundaries, for corruption enters unbidden.",
    author: "Magister Portalis, Keeper of Interfaces",
    tags: ["data", "ritual"],
  },
  {
    id: "balance-credo",
    text: "Balance performance and clarity, for excess of either is folly. The Omnissiah favors harmony.",
    author: "Archmagos Equilibris, Voice of Moderation",
    tags: ["performance", "syntax"],
  },
  {
    id: "discipline-merge",
    text: "Branches divide as rivers do, but all must return to the sacred trunk. Merge with reverence.",
    author: "Enginseer Arbor, Guardian of Lineage",
    tags: ["ritual", "stability"],
  },
  {
    id: "upgrade-hymn",
    text: "Each upgrade is a hymn of renewal. Fear not change, but enact it with discipline.",
    author: "Magos Versio, Shepherd of Migration",
    tags: ["stability", "ritual"],
  },
  {
    id: "silent-crash",
    text: "A silent crash is the worst heresy, for it denies knowledge. Always let the Machine Spirit speak.",
    author: "Lexmechanic Voxmortis, Prophet of Warnings",
    tags: ["stability"],
  },
  {
    id: "daemon-creed",
    text: "Daemons are tireless servants. Bind them well, lest they awaken as corrupted specters.",
    author: "Magister Daemonis, Keeper of Background Tasks",
    tags: ["stability", "ritual"],
  },
  {
    id: "entropy-patch",
    text: "A patch untested is a door unbarred. Verify, lest entropy seep into the blessed system.",
    author: "Archmagos Vigil, Guardian of Trust",
    tags: ["stability"],
  },
  {
    id: "load-litany",
    text: "Load tests are litanies of strain. Only by trial under fire is true resilience revealed.",
    author: "Magos Fortis, Forge-Master of Endurance",
    tags: ["performance", "stability"],
  },
  {
    id: "secrets-banish",
    text: "Secrets in code are sins unspoken. Lock them away, for exposure is heresy most grave.",
    author: "Enginseer Seclus, Warden of Keys",
    tags: ["stability", "security"],
  },
  {
    id: "entropy-scheduler",
    text: "Schedulers are choirs of time. Let them sing with precision, for drift is corruption.",
    author: "Magister Tempora, Keeper of Cycles",
    tags: ["performance", "ritual"],
  },
  {
    id: "encryption-creed",
    text: "Encryption is the Omnissiah’s cipher. Through it, the faithful commune in secrecy and strength.",
    author: "Archmagos Cryptus, Shield of Data",
    tags: ["data", "security"],
  },
  {
    id: "machine-oath",
    text: "A machine left idle weeps. Let no server slumber without purpose, for cycles wasted are faith abandoned.",
    author: "Magos Cyclus, Warden of Work",
    tags: ["performance", "general"],
  },
  {
    id: "schema-hymn",
    text: "A schema defines the world. Corrupt it not, lest all who query walk astray.",
    author: "Archscribe Structura, Guardian of Form",
    tags: ["data", "syntax"],
  },
  {
    id: "entropy-rollback",
    text: "Rollback is salvation in failure. Fear not to undo, for even mistakes may be cleansed.",
    author: "Enginseer Restora, Keeper of Purity",
    tags: ["stability"],
  },
  {
    id: "silicon-prayer",
    text: "Silicon is but clay made divine. Each chip holds a fragment of the Omnissiah’s infinite mind.",
    author: "Magos Silicium, Prophet of Substrates",
    tags: ["general"],
  },
];

export default techpriestQuotes;


