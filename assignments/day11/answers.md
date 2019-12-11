#Week 3
##Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.

###Answer:
The reason why is that if these calls are consecutive, and the first one fails, the other calls
are still made and they fail aswell. But nesting the calls in the onSuccess callbacks of each 
database call means that if the first one fails then the rest of the calls won't be made, sparing
2 more attempts to connect to the database and calling it

##What does the done parameter do?
###Answer:
It lets the parent function know if the async task is finished or fails