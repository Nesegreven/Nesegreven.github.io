var app = new Vue({
    el: '#app',
    data: {
      tickets: [],
      phoneNumber: "######",
      winner: false,
      previousWinners: [],
      ticketdrawing: false,
      uTickets: 1,
      winningNumber: -1,
      uName: "",
      wColor: 'red',
      drawing: false,
      drawnTicketNumbers: [],
    },
    components: {},
    computed: {},
    asyncComputed: {},
    watch: {},
    methods: {
      addTickets() {
        if (this.uName !== "" && this.uTickets > 0) {
          const startingNumber = this.tickets.length > 0 ? this.tickets[this.tickets.length - 1].number + 1 : 1;
          for (let i = 0; i < this.uTickets; i++) {
            const ticket = {
              number: startingNumber + i,
              name: this.uName
            };
            this.tickets.push(ticket);
          }
          this.uName = "";
          this.uTickets = 1;
          removeConfetti();
        }
      },
      drawTicket() {
        if (this.tickets.length > 0 && this.drawnTicketNumbers.length < this.tickets.length) {
          removeConfetti();
          this.drawing = true;
          let n = 0;
          let drawnTicketNumber = -1;
          
          do {
            n = ~~(Math.random() * this.tickets.length);
            drawnTicketNumber = this.tickets[n].number;
          } while (this.drawnTicketNumbers.includes(drawnTicketNumber));
          
          this.drawnTicketNumbers.push(drawnTicketNumber);
          
          for (let i = 10; i < 100; i++) {
            setTimeout(() => {
              this.winner = this.tickets[n];
              this.winningNumber = this.winner.number;
              this.wColor = i % 2 === 0 ? 'red' : 'yellow';
            }, 150000 / i)
          }
          
          setTimeout(() => {
            this.previousWinners.push(this.winner);
            this.wColor = 'green';
            this.drawing = false;
            startConfetti();
          }, 16050)
          
          setTimeout(() => {
            removeConfetti();
          }, 30000)
        }
      },
      undoDrawing(i) {
        const winner = this.previousWinners[i];
        const insertIndex = this.tickets.findIndex(ticket => ticket.number > winner.number);
        
        if (insertIndex === -1) {
          this.tickets.push(winner);
        } else {
          this.tickets.splice(insertIndex, 0, winner);
        }
        
        const removedNumberIndex = this.drawnTicketNumbers.indexOf(winner.number);
        if (removedNumberIndex > -1) {
          this.drawnTicketNumbers.splice(removedNumberIndex, 1);
        }
        
        this.winningNumber = -1;
        this.winner = false;
        this.previousWinners.splice(i, 1);
        removeConfetti();
      },
      removeTicket(draw) {
        const removedTicketNumber = this.tickets[draw].number;
        
        this.tickets.splice(draw, 1);
        
        const removedNumberIndex = this.drawnTicketNumbers.indexOf(removedTicketNumber);
        if (removedNumberIndex > -1) {
          this.drawnTicketNumbers.splice(removedNumberIndex, 1);
        }
      }
    },
    created() {}
  });
  