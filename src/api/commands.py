
import click
from api.models import db, User, Info

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-data") # name of our command
    def insert_test_data():
        #print("Creating test users")
        #for x in range(1, int(count) + 1):
        user = User()
        user.firstName = "WordSword Devs"
        user.lastName = "Full Stack"
        user.email = "test" + "@test.com"
        user.password = "123456"
        user.is_active = True
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")

        for x in range(1, 7):
            info = Info()
            info.user_id = 1
            info.title = "Test Title " + str(x)
            info.new_text = "this is example number: " + str(x) + "--------Lorem ipsum dolor sit amet, his ea tamquam ceteros theophrastus, te partem abhorreant sit. Qui id simul convenire. Dicit oratio vivendum nec ei, qui altera intellegam no. Sed in stet noster comprehensam, ut albucius appetere mel, consequuntur conclusionemque ea sit. Ius fuisset mnesarchum suscipiantur et. Vidit detraxit tacimates te vix. Admodum officiis ea sed, omnis nulla omittam ad vis. Ne natum invenire salutatus est. Ea aperiam evertitur per, ne suas ancillae platonem cum, autem iriure no sed. No eius dicant sea, volumus pertinacia in nec. Vim discere insolens patrioque eu. Sed cu exerci propriae, illud etiam option cu nam, in mel nisl erant. Nec et denique expetenda omittantur. Ut ancillae invidunt vis, per no fabulas nominati. Postea atomorum abhorreant ut his, alii scripta ut sit. Eu vim vocibus aliquando, an eam putant debitis. Sea ex erat omnes moderatius. Ut vis debitis lucilius evertitur, tota quando sea cu. Duis admodum duo in, sit te commodo vidisse accusam, ea scripta petentium eos. Ad phaedrum dissentiet nec, id dicit bonorum has. Vim ea saepe populo. Ne natum assum appareat vel. Justo movet eu mea, inani nemore honestatis eu nam, noluisse invidunt est ne. Graeci oblique ne ius. Id his malis aeterno inimicus. Ei nam vero detracto senserit, per dicit putant insolens an. Eu est nisl tollit, sed clita constituto ea. Laoreet scripserit eu mea, at vel dicta putent liberavisse. Ut duo movet propriae voluptaria, est ex case munere voluptaria. Ea argumentum percipitur eum."
            db.session.add(info)
            db.session.commit()
            print("User_ID: ", info.user_id, "new_text: ", info.new_text, "title: ", info.title)
            print("")
            print("Test info has been stored")
            print("")
        print("variables are set up in the backend. Time to start developing! :) ")
        print("")
        ### Insert the code to populate others tables if needed