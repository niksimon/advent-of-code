#include <stdio.h>
#include <stdlib.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int score = 0;
    int lose[3] = {3, 1, 2};
    int win[3] = {2, 3, 1};

    while(fgets(line, sizeof(line), file)) {
        int opponent = line[0] - 'A';
        int player = line[2] - 'X';
        switch(player) {
            case 0:
                score += lose[opponent];
                break;
            case 1:
                score += opponent + 4;
                break;
            case 2:
                score += win[opponent] + 6;
                break;
        }
    }

    printf("%d", score);

    fclose(file);
    return 0;
}